const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('beforeinstallprompt')
    event.preventDefault();
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false); // false = to remove 'hidden' class if it doesn't already exist
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    console.log('Install btn clicked')
    const promptEvent = window.deferredPrompt;
    console.log(promptEvent);
    if(!promptEvent) {
        return;
    }

    promptEvent.prompt();

    window.deferredPrompt = null;

    butInstall.classList.toggle('hidden', true); // true = to add 'hidden' class if it doesn't already exist
});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('app installation checked')
    butInstall.classList.toggle('hidden', true);
    window.deferredPrompt = null;
})

// if(window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
//     console.log('app installation checked2');
//     butInstall.classList.toggle('hidden', true);
//     window.deferredPrompt = null;
// }
