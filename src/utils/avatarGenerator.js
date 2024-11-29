const generateAvatar = (username) => {
    const finalName = encodeURIComponent(username.trim());
    return `https://avatar.iran.liara.run/public/?username=${finalName}`;
};

export default generateAvatar;
