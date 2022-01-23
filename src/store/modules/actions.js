export default {
    loadData({commit},data){
        try {
            commit("setForceUpdate")
            data.vm.$http.get(
                `/reminder/${data.firstDate.date}/${data.lastDate.date}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin' : '*',
                    }
                }
            ).then(async res =>{
                commit("setReminders",res.data)
                commit("setForceUpdate")
            })
            .catch((error)=>{
                commit("setOffline")
                commit("setForceUpdate")
                console.log(error)
            })
        } catch (error) {
            commit("setForceUpdate")
            console.log(error)
            
        }
        console.log("testando")
        // let listReminders = data.vm.$store.getters.reminders
        //     listDates.map(x =>{
        //         x.reminders= listReminders.filter(y=> y.date == x.date)
        //     })
        // commit('setReminders',listDates)
        
    }
}