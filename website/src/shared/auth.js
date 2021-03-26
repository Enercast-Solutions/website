import { Auth, Cache } from 'aws-amplify';
import '../config.js';

export async function getUser() {
    return await Auth.currentAuthenticatedUser({
        bypassCache: false
    });
}

export async function loadUserFromCache() {
    let user = await Cache.getItem(global.config.userCacheKey);

    if (!user || Object.keys(user).length === 0) {
        user = getUser();
        await Cache.setItem(global.config.userCacheKey, user);
    }

    return user;
}
