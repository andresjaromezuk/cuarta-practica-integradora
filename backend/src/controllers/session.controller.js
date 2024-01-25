export const sessionController= {
    login:  (req, res, next) => {
        res['successfullPost'](req.jwt)
    },

    current: async (req, res, next) =>{
        res['successfullGet'](req.user)
    },

    delete: (req, res) => {
        res['successfullLogout']()
    }
}