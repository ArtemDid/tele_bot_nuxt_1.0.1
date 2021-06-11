const Swal = require('sweetalert2')

export const state = () => ({
    user: {},
    history: { rows: [], count: 0 },
    rates: [],
    ratesToday: [],
    users: [],
    check: true
})

export const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    setHistory(state, history) {
        state.history.rows = history.rows;
        state.history.count = history.count[0].count;
    },
    setPartHistory(state, rows) {
        state.history.rows = rows;
    },
    setRates(state, rates) {
        state.rates = rates;
    },
    setRatesToday(state, ratesToday) {
        state.ratesToday = ratesToday;
    },
    setUsers(state, users) {
        state.users = users;
    },
    showUserCheckFalse(state) {
        state.check = true;
    },
    showUserCheck(state) {
        state.check = false;
    }

}

export const actions = {
    async fetch_auth({ commit }, form) {
        try {
            const response = await fetch(`http://localhost:3001/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            const data = await response.json();

            console.log(data);
            commit('setUser', data);

            if (!data.success) {
                console.log('[error]: ', data)
                return;
            }

            if (localStorage === undefined) return;

            localStorage.login = form.email;
            localStorage.password = form.password;
            localStorage.token = data.token;
            console.log(localStorage)
            this.$router.push('/showMain')
            return;
        } catch (err) {
            alert(err);
            console.log("Not Found");
        }
    },
    async fetch_registr({ commit }, form) {
        try {
            const response = await fetch(`http://localhost:3001/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            const data = await response.json();

            console.log(data);
            commit('setUser', data);

            if (!data.success) {
                console.log('[error]: ', data)
                return;
            }

            if (localStorage === undefined) return;

            localStorage.login = form.email;
            localStorage.password = form.password;
            localStorage.token = data.token;
            console.log(localStorage)

            this.$router.push('/')
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        } catch (err) {
            alert(err);
            console.log("Not Found");
        }

    },

    async nuxtClientInit({ commit }, context) {
        try {
            const response = await fetch(`http://localhost:3001/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.token
                },
                body: JSON.stringify({ email: '', password: '' }),
            });
            const data = await response.json();

            console.log(data);
            commit('setUser', data);

            if (!data.success) {
                console.log('[error]: ', data)
                let { redirect } = context;
                redirect(307, '/?message=login')
                return;
            }

            console.log('good')
            commit('setHistory', data);
            return;
        } catch (err) {
            alert(err);
            console.log("Not Found");
        }

    },

    async showPartHistory({ commit }, send) {
        try {
            const response = await fetch(`http://localhost:3001/part/history`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(send),
            });
            const data = await response.json();

            console.log(data);
            if (!data.success) {
                console.log('[error]: ', data)
                return;
            }

            commit('setPartHistory', data.rows);
            return;
        } catch (err) {
            alert(err);
            console.log("Not Found");
        }
    },

    async show_rates({ commit }, rate) {
        try {
            const response = await fetch(`http://localhost:3001/rates`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rate }),
            });
            const data = await response.json();

            console.log(data);
            if (!data.success) {
                console.log('[error]: ', data)
                return;
            }

            commit('setRates', data.mas);
            return;
        } catch (err) {
            alert(err);
            console.log("Not Found");
        }
    },

    async ratesToday({ commit }) {
        try {
            const response = await fetch(`http://localhost:3001/rates/today`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            console.log(data);
            if (!data.success) {
                console.log('[error]: ', data)
                return;
            }
            data.itemUSD.shift()

            commit('setRatesToday', data.itemUSD);
            return;
        } catch (err) {
            alert(err);
            console.log("Not Found");
        }
    },
    showUserCheckFalse({ commit }) {
        commit('showUserCheckFalse');
    },
    async showUserCheck({ commit }) {
        try {
            commit('showUserCheck');

            const response = await fetch(`http://localhost:3001/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            console.log(data);
            if (!data.success) {
                console.log('[error]: ', data)
                return;
            }

            commit('setUsers', data.response.rows);
            return;
        } catch (err) {
            alert(err);
            console.log("Not Found");
        }
    }

}

export const getters = {
    user: s => s.user,
    history: s => s.history,
    rates: s => s.rates,
    ratesToday: s => s.ratesToday,
    users: s => s.users,
    check: s => s.check,
}