const logoutController = {}

logoutController.logout = (req, res) => {
    try {
        res.clearCookie("authCookie")
        return res.status(200).json({ message: "Sesion Cerrada" })

    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({ message: "Internal Served Error" })


    }
}

export default logoutController