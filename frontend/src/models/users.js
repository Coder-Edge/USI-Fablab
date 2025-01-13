
class User {
    /**
     * @param {string} name
     * @param {string} email
     * @param {string} password
     * @param {string} userType 
     */

    constructor(name, email, password, userType) {
        if (typeof name === "object" && name != null) {
            const {name: username, email: useremail, password: userpassword, userType: user_type} = name
            this.name = username
            this.email = useremail
            this.password = userpassword
            this.userType = user_type
        } else {
            this.name = name
            this.email = email
            this.password = password
            this.userType = userType
        }
    }
}

const users = [
    new User("Gloire Mankununusakjdfj df", "gloire@mankunwekdnfklnun.com", "eiir,kenflkf@z12", "Manager"),
    new User("Remile Biangasadnflknd", "remile@biafwkanflnga.com", "ttsfwenftèaé1", "Student"),
    new User("Nathan Lukambaslkdnfnd", "natha@lukafweknmba.com", "stttefnlfs425", "Member"),
    new User("Claudel Mubenzem Mfumu Africainsdknflken", "claudelfeknf@mubenzem.com", "rrzrr152", "Extern"),
]

export {User, users}