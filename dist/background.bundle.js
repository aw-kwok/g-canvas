(()=>{var e=!0;function n(n){var o=n.responseHeaders||[];return o.push({name:"Access-Control-Allow-Origin",value:"*"}),o.push({name:"Access-Control-Allow-Methods",value:"GET, POST, PUT, DELETE, OPTIONS"}),o.push({name:"Access-Control-Allow-Headers",value:"Content-Type, Authorization"}),e&&console.log("handleHeadersReceived executed"),{responseHeaders:o}}function o(o){var r="".concat(o,"/*");chrome.webRequest.onHeadersReceived.removeListener(n),e&&console.log("listener removed"),chrome.webRequest.onHeadersReceived.addListener(n,{urls:[r]},["responseHeaders"]),e&&console.log("added listener")}chrome.runtime.onInstalled.addListener((function(){chrome.identity.getAuthToken({interactive:!0},(function(n){chrome.runtime.lastError?console.error(chrome.runtime.lastError):(function(e){fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:"Bearer "+e}}).then((function(e){return e.json()})).then((function(e){console.log("User Info:",e)})).catch((function(e){return console.error("Error fetching user info:",e)}))}(n),function(n){e&&console.log("In getCalendar"),fetch("https://www.googleapis.com/calendar/v3/calendars/".concat("asdfasdfasdfas@group.calendar.google.com"),{headers:{Authorization:"Bearer "+n}}).then((function(e){return e.json()})).then((function(o){o.error?(e&&console.log("Calendar not found"),function(n){fetch("https://www.googleapis.com/calendar/v3/calendars",{method:"POST",headers:{Authorization:"Bearer "+n,"Content-Type":"application/json"},body:JSON.stringify({summary:"g-canvas",description:"imported from g-canvas"})}).then((function(e){return e.json()})).then((function(o){e&&console.log("Calendar Created:",o),fetch("https://www.googleapis.com/calendar/v3/users/me/calendarList?colorRgbFormat=true",{method:"POST",headers:{Authorization:"Bearer "+n,"Content-Type":"application/json"},body:JSON.stringify({id:o.id,backgroundColor:"#40E0D0",foregroundColor:"#000000",selected:!0})}).then((function(e){return e.json()})).then((function(n){e&&console.log("Calendar list object:",n)})).catch((function(e){return console.error("Error updating calendarList:",e)}))})).catch((function(e){return console.error("Error creating calendar:",e)}))}(n)):e&&console.log("Calendar Info:",o)})).catch((function(e){return console.error("Error fetching calendar info:",e)}))}(n))}))})),chrome.runtime.onMessage.addListener((function(e,n,o){if("fetchICS"===e.action)return fetchICS(e.url).then((function(e){var n=parseICS(e);o({events:n})})).catch((function(e){o({error:e.message})})),!0})),e&&console.log("listener initialized"),chrome.storage.sync.get(["CANVAS_API_URL"],(function(e){e.CANVAS_API_URL?o(e.CANVAS_API_URL):console.warn("CANVAS_API_URL is not set in storage")})),chrome.storage.onChanged.addListener((function(n,r){if(e&&console.log("URL pattern changed"),"sync"===r&&n.CANVAS_API_URL){var t=n.CANVAS_API_URL.newValue;t&&o(t)}}))})();