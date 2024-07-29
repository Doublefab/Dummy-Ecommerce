class UserService {
  static test = "test";
  static basePath =
    "https://e-commerce-anxious-gnu-sl.cfapps.us10-001.hana.ondemand.com/";


  static async create(newUserData) {
    try {
      await axios.post(this.basePath + "user", newUserData);
    } catch (error) {
      console.log("Errore:", error);
    }
  }
  static async me() {
    try {
        const header = {}
      await axios.post(this.basePath + "user", newUserData);
    } catch (error) {
      console.log("Errore:", error);
    }
  }
}
