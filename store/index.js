export const state = () => ({
    user: {}
})

export const mutations = {
    setUser(state, user) {
        state.user = user;
    }
}

export const actions = {
    async fetch({ commit }, form) {
        // const user = await this.$axios.$post('http://localhost:3001/login', form);

        fetch(`http://localhost:3001/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);

                if (data.success) {

                    if (localStorage !== undefined) {
                        localStorage.login = form.email;
                        localStorage.password = form.password;
                        localStorage.token = data.token;
                        console.log(localStorage)

                    }

                    

                }

                commit('setUser', data);
            })
            .catch(err => {
                alert(err);
                console.log("Not Found");
            });

    }
}

export const getters = {
    user: s => s.user
}