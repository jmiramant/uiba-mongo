export function mixpanelTrack(action, obj) {
  if (window.mixpanel) {
    if (obj) {
      mixpanel.track(action, obj);
    } else {
      mixpanel.track(action);
    }
  }
}

export function mixpanelURLTrack(action) {
  if (window.mixpanel) {
    mixpanel.track(action, {
      href: document.location.href,
      origin: document.location.origin,
      pathname: document.location.pathname,
      search: document.location.search,
    });
  }
}

export function indentifyUser(email) {
  if (window.mixpanel) {
    mixpanel.identify(email);
  }
}

export function setUser(email, userData) {
  if (window.mixpanel) {
    const user = {...userData, 
      "$email": email,
      "$last_login": new Date()
    }
    mixpanel.people.set(user);
  }
}

export default {
  setUser,
  indentifyUser,
  mixpanelTrack,
  mixpanelURLTrack,
}