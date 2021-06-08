const Swal = require('sweetalert2')

export const state = () => ({
    user: {},
    mass_list: []
})

export const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    setMass(state, mass_list) {
        state.mass_list = mass_list;
    }
}

export const actions = {
    async fetch_auth({ commit }, form) {
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
                    this.$router.push('/showMain')

                }

                commit('setUser', data);
            })
            .catch(err => {
                alert(err);
                console.log("Not Found");
            });
    },
    async fetch_registr({ commit }, form) {
        fetch(`http://localhost:3001/create`, {
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
                    }
                    this.$router.push('/')

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }

                commit('setUser', data);
            })
            .catch(err => {
                alert(err);
                console.log("Not Found");
            });

    },

    async nuxtClientInit({ commit }) {
        console.log(process.browser ? localStorage.token : "eee")
        fetch(`http://localhost:3001/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.token
            },
            body: JSON.stringify({email: '', password: ''}),
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                console.log(process.client ? localStorage.token : "");
                if (data.success) {
                    console.log('good')
                    commit('setMass', data.rows);
                }
                else {
                    console.log('error')
                    redirect('/?message=login')
                }

            })
            .catch(err => {
                console.log("Not Found");
            });

    },
    async massListAsync({ commit }) {
        fetch(`http://localhost:3001/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': process.browser ? localStorage.token : ""
            },
            body: JSON.stringify({email: '', password: ''}),
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                
                if (data.success) {
                    console.log('good')
                    commit('setMass', data.rows);
                }
                else {
                    console.log('error')
                }

            })
            .catch(err => {
                console.log("Not Found");
            });

    }
}

export const getters = {
    user: s => s.user,
    mass_list: s => s.mass_list,

}