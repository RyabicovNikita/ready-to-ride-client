export const login = () =>
    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    })
        .then(({ user }) => user)
        .catch((e) => ({ error: e.message }));
