// content.js

// Constants and Selectors
const SCROLL_AMOUNT = 1000;
const MIN_SLEEP_TIME = 1000;
const MAX_SLEEP_TIME = 2000;
const JOIN_DRAW_MODAL_SELECTOR = '.JoinDrawModal_joinDraw__30-Mo';
const FOLLOW_BUTTON_SELECTOR = '.JoinDrawModal_joinStepBtn__DAjP0';
const JOIN_DRAW_BUTTON_SELECTOR = '.JoinDrawModal_submitBtn__RJXvp';
const DRAW_CARD_PRIZE_SELECTOR = '.DrawCard_prizeName__yfym8';

// Variables
let stopButton = false;

async function sleepWithRandomization() {
    const randomTime = Math.random() * (MAX_SLEEP_TIME - MIN_SLEEP_TIME) + MIN_SLEEP_TIME;
    console.log(`Sleep for ${randomTime / 1000} seconds`);
    return new Promise(resolve => setTimeout(resolve, randomTime));
}

function stopScript() {
    stopButton = true;
    console.log("Script stopped.");
}

async function findLuckyDrawPosts() {
    while (!stopButton) {
        const prizeElements = document.querySelectorAll(DRAW_CARD_PRIZE_SELECTOR);

        for (const prizeElement of prizeElements) {
            const prizeValue = prizeElement.textContent;

            if (prizeValue.includes('$') && parseInt(prizeValue.replace('$', '')) >= 10) {
                let postElement = prizeElement;
                while (postElement) {
                    postElement = postElement.parentElement;
                    if (postElement && postElement.hasAttribute('data-item-index')) {
                        await joinLuckyDraw(postElement);
                        break;
                    }
                }
            }
            await sleepWithRandomization();
        }

        await scrollPage();
        await sleepWithRandomization();
    }
}

function startScript() {
    stopButton = false;
    console.log("Script started.");
    findLuckyDrawPosts();
}

async function joinLuckyDraw(postElement) {
    const joinButton = postElement.querySelector('button.Button_button__1yaWD.Button_is_primary__1b4PX.DrawCard_joinBtn__1h76s');

    if (joinButton) {
        joinButton.click();
        await sleepWithRandomization();

        const modalElement = document.querySelector(JOIN_DRAW_MODAL_SELECTOR);

        if (modalElement) {
            const followButton = modalElement.querySelector(FOLLOW_BUTTON_SELECTOR);

            if (followButton) {
                const ariaDisabled = followButton.getAttribute('aria-disabled');
                if (ariaDisabled !== "true") {
                    followButton.click();
                } else {
                    console.log("Follow button is unavailable");
                }
                await sleepWithRandomization();
            }

            const joinDrawButton = modalElement.querySelector(JOIN_DRAW_BUTTON_SELECTOR);

            if (joinDrawButton) {
                const ariaDisabled = joinDrawButton.getAttribute('aria-disabled');
                if (ariaDisabled !== "true") {
                    joinDrawButton.click();
                } else {
                    console.log("Join the Lucky Draw button is unavailable");
                }
            }
        }
    } else {
        console.log('Join the Draw button not found in this post.');
    }
}

async function scrollPage() {
    window.scrollBy(0, SCROLL_AMOUNT);
    await sleepWithRandomization();
}

