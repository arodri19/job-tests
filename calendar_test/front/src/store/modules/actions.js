export default {
    loadData({ commit }, data) {
        commit("setForceUpdate")
        data.vm.$http.get(
            `/reminder/${data.firstDate.date}/${data.lastDate.date}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            }
        ).then(async res => {
            commit("setReminders", res.data)
            commit("setForceUpdate")
        })
            .catch(() => {
                commit("setOffline")
                commit("setForceUpdate")
            })


    }
}