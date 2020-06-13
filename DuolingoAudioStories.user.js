// ==UserScript==
// @name        Duolingo Audio Stories
// @namespace   Violentmonkey Scripts
// @match       *://*.duolingo.com/stories/*
// @grant       GM_addStyle
// @version     1.1
// @author      Cal Stephens
// @description Improve your listening comprehension by hiding the text in Duolingo stories
// ==/UserScript==

// Known CSS classes

/// The outer-most CSS class of the Speech Bubbles
const speech_bubble = "_3YBKO"

/// Text that appears outside of speech bubbles
const challenge_marker = "_2rXtz"
const line_text_content = "_2rXtz"

/// The text inside a speech bubble
const synced_text = "JQRA4"
const highlighted = "V0X_u"

/// The "play audio" button
const play_line_audio_button = "bV45r"


// Hide the text in the speech bubble
// unless the user hovers over it

GM_addStyle(`
  .${speech_bubble}:not(:hover) {
    color: #def0a5 !important;
    background-color: #def0a5 !important;
  }

  .${speech_bubble}:hover {
    color: #4c4c4c !important;
  }
`)

// Also hide the undecorated narrator text
// (exclude text in Challenge exercises)

GM_addStyle(`
  :not(.${challenge_marker}) > .${line_text_content}:not(:hover) {
    color: #def0a5;
    background-color: #def0a5;
  }

  :not(.${challenge_marker}) > .${line_text_content}:hover {
    color: #4c4c4c;
  }
`)

// Force the child text to use the same
// text color as the bubble container
// (synchronized with the hover state)

GM_addStyle(`
  .${synced_text}.${highlighted} {
    color: inherit
  }

  .${synced_text} {
    color: inherit
  }
`);

// Disable the speech bubble arrow, because
// it doesn't synchronize its background color
// with the rest of the bubble's hover state

GM_addStyle(`
  .${speech_bubble}::before {
    border-bottom: 0px;
    border-right: 0px;
    border-top-left-radius: 0%;
    content: '';
    left: 0px;
    position: absolute;
    top: 0px;
  }

  .${speech_bubble}::after {
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
    var visiblePlayButtons = Array.from(
        document.getElementsByClassName(play_line_audio_button))
        .filter(button => button.offsetParent !== null);
    
    if (visiblePlayButtons.count == 0) return
    var playButton = visiblePlayButtons[playButtons.length - 1]
    
    // and simulate a click event.
    playButton.click()
    
  }
  
})
