// ==UserScript==
// @name        Duolingo Audio Stories
// @namespace   Violentmonkey Scripts
// @match       *://stories.duolingo.com/*
// @grant       GM_addStyle
// @version     1.0
// @author      Cal Stephens
// @description Improve your listening comprehension by hiding the text in Duolingo stories
// ==/UserScript==


// Hide the text in the speech bubble
// unless the user hovers over it

GM_addStyle(`
  .speech-bubble:not(:hover) {
    color: #def0a5;
    background-color: #def0a5;
  }

  .speech-bubble:hover {
    color: #4c4c4c;
  }
`)

// Also hide the undecorated narrator text
// (exclude text in Challenge exercises)

GM_addStyle(`
  :not(.challenge-marker) > .line-text-content:not(:hover) {
    color: #def0a5;
    background-color: #def0a5;
  }

  :not(.challenge-marker) > .line-text-content:hover {
    color: #4c4c4c;
  }
`)

// Force the child text to use the same
// text color as the bubble container
// (synchronized with the hover state)

GM_addStyle(`
  .synced-text.highlighted {
    color: inherit;
  }

  .synced-text {
   color: inherit;
  }
`);

// Disable the speech bubble arrow, because
// it doesn't synchronize its background color
// with the rest of the bubble's hover state

GM_addStyle(`
  .speech-bubble::before {
    border-bottom: 0px;
    border-right: 0px;
    border-top-left-radius: 0%;
    content: '';
    left: 0px;
    position: absolute;
    top: 0px;
  }

  .speech-bubble::after {
    border-bottom: 0px;
    border-right: 0px;
    content: '';
    left: 0px;
    position: absolute;
    top: 0px;
  }
`)


// Enable Control-Space to repeat the current phrase
// (This is how normal Duolingo lessons work)
document.addEventListener('keyup', (e) => {
  
  // When the user presses Control-Space...
  if (e.code === "Space" && e.ctrlKey) {
    
    // Find the Play button...
    var playButtons = document.getElementsByClassName("play-line-audio-button selected")
    if (playButtons.count == 0) return
    var playButton = playButtons[0]
    
    // and simulate a click event.
    playButton.click()
    
  }
  
})
