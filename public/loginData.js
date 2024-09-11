document.addEventListener('alpine:init', () => {
    Alpine.data('alpine', () => {
        return {

            //BACKEND CHECKS
            cEmail: '',
            cOrg: '',
            cPassword:'',
            cUserName: '',
            cSurname: '',
            cUserRole:'',



/* LOGIN AND SIGNUP PAGE
-------------------------------------------------------------------------------------------------------------------------------------------------------- */
            email: '',
            userPassword: '',
            organisation: '',
            userRole: '',
            userName: '',
            userSurname: '',
            showSignUpForm: false,




            
            async fetchUserProfile(){
                try{
                    const response = await axios.get(`http://localhost:5565/profile/get_one_profile/${this.email}`);
                    
                    if (response.status === 200) {
                        console.log('Profile:', response.data);
                        this.cEmail = response.data.E_mail;
                        this.cOrg = response.data.Organisation;
                        this.cPassword = response.data.User_Password;
                        this.cUserName = response.data.UserName;
                        this.cSurname = response.data.Surname;
                        this.cUserRole = response.data.User_Role;
                    } else {
                        alert('Failed');
                    }
            
                } catch (err) {
                    console.error('Error fetching profile:', err.message); // Log the error
                    alert('An error occurred while fetching the profile.');
                }
            },

            async login() {
               const login =  await this.fetchUserProfile();

               if (this.email === this.cEmail && this.userPassword === this.cPassword) {
                alert(`HELLO + ${this.cUserName}`)

            } else {
                alert('Login failed. Please check your credentials.');
            }

            },

        
            async fetchAddProfile(){
                try{
                    const response = axios.post(`http://localhost:5565/profile/add_new_user/`, 
                        {
                            Organisation : this.organisation,
                            UserName : this.userName, 
                            Surname : this.userSurname, 
                            E_mail : this.email,
                            User_Password : this.userPassword,
                            User_Role : this.userRole
                        });
                        if (response.status === 200) {
                            alert('Profile added');
                            this.organisation ='';
                            this.userName ='';
                            this.userSurname ='';
                            this.email ='';
                            this.userPassword ='';
                            this.User_Role ='';
                        } else {
                            alert('Failed to load profile')
                        }
                } catch (err){
                    console.error('Error', err.message)
                }
            },

            async submitSignUp() {
            
            await this.fetchAddProfile();


                /* alert('Form Submitted'); */
            },


        }
    });
});


        