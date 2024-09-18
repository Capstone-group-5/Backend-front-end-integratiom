document.addEventListener('alpine:init', () => {
    Alpine.data('alpine', () => {
        return {


            /*CROSS SECTIONAL CHECKS
-------------------------------------------------------------------------------------------------------------------------------------------------------- */

            loginSection: true,
            homepage: false,
            taskPage: false,
            machinePage: false,
            cropPage: false,
            analysisPage: false,
            profilePage: false,
            showPopup: false,
            taskUpdate: false,
            about: false,


            //BACKEND CHECKS
            cEmail: '',
            cOrg: '',
            cPassword: '',
            cUserName: '',
            cSurname: '',
            cUserRole: '',





            /* LOGIN AND SIGNUP PAGE
            -------------------------------------------------------------------------------------------------------------------------------------------------------- */
            email: '',
            userPassword: '',
            organisation: '',
            userRole: '',
            userName: '',
            userSurname: '',
            showSignUpForm: false,





            async fetchUserProfile() {
                try {
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
                    console.error('Error fetching profile:', err.message);
                    alert('An error occurred while fetching the profile.');
                }
            },

            async login() {
                try {
                    const login = await this.fetchUserProfile();

                    if (this.email === this.cEmail && this.userPassword === this.cPassword) {
                        this.loginSection = false;
                        this.homepage = true;
                        this.currentPage = 'homePage';
                        localStorage.setItem('profile', JSON.stringify({
                            email: this.cEmail,
                            organisation: this.cOrg,
                            password: this.cPassword,
                            userName: this.cUserName,
                            surname: this.cSurname,
                            userRole: this.cUserRole
                        }));
                        localStorage.setItem('currentPage', this.currentPage);
                    } else {
                        alert('Login failed. Please check your credentials.');
                    }
                } catch (err) {
                    console.error('Error fetching profile:', err.message);
                    alert('An error occurred while fetching the profile.');
                }
            },



            async fetchAddProfile() {
                try {
                    const response = axios.post(`http://localhost:5565/profile/add_new_user/`,
                        {
                            Organisation: this.organisation,
                            UserName: this.userName,
                            Surname: this.userSurname,
                            E_mail: this.email,
                            User_Password: this.userPassword,
                            User_Role: this.userRole
                        });
                    if (response.status === 200) {
                        alert('Profile added');
                        this.organisation = '';
                        this.userName = '';
                        this.userSurname = '';
                        this.email = '';
                        this.userPassword = '';
                        this.User_Role = '';
                    } else {
                        alert('Failed to load profile')
                    }
                } catch (err) {
                    console.error('Error', err.message)
                }
            },

            async submitSignUp() {

                await this.fetchAddProfile();


                /* alert('Form Submitted'); */
            },

            logout() {
                // Reset all state variables to their default values
                this.loginSection = true;
                this.homepage = false;
                this.taskPage = false;
                this.machineryPage = false;
                this.cropPage = false;
                this.analysisPage = false;

                // BACKEND CHECKS
                this.cEmail = '';
                this.cOrg = '';
                this.cPassword = '';
                this.cUserName = '';
                this.cSurname = '';
                this.cUserRole = '';

                // LOGIN AND SIGNUP PAGE
                this.email = '';
                this.userPassword = '';
                this.organisation = '';
                this.userRole = '';
                this.userName = '';
                this.userSurname = '';
                this.showSignUpForm = false;

                // Clear local storage
                localStorage.removeItem('profile');
                localStorage.removeItem('currentPage');

            },


            async fetchUpdateProfile() {
                try {
                    const response = await axios.put(`http://localhost:5565/profile/Update/user_profile/${this.email}`, {
                        Organisation: this.cOrg,
                        UserName: this.userName,
                        Surname: this.userSurname,
                        E_mail: this.email,
                        User_Password: this.userPassword,
                        User_Role: this.userRole
                    });

                    if (response.status === 200) {
                        alert('Profile updated successfully');
                        this.cEmail = this.email;
                        this.cPassword = this.userPassword;
                        this.cUserName = this.userName;
                        this.cSurname = this.userSurname;
                        this.cUserRole = this.User_Role;
                    } else {
                        alert('Failed to update profile');
                    }
                } catch (err) {
                    console.error('Error', err.message);
                    alert('An error occurred while updating the profile');
                }
            },
            async updateProfile() {
                // Extract the values
                const organisation = this.cOrg || '';
                const userName = this.userName || '';
                const userSurname = this.userSurname || '';
                const email = this.email || '';
                const userPassword = this.userPassword || '';
                const userRole = this.userRole || '';

                // Check if any field is empty
                if (
                    organisation.trim() === '' ||
                    userName.trim() === '' ||
                    userSurname.trim() === '' ||
                    email.trim() === '' ||
                    userPassword.trim() === '' ||
                    userRole.trim() === ''
                ) {
                    alert('Please fill out all fields.');
                    return;
                }

                // Proceed to update profile
                await this.fetchUpdateProfile();
            },



            /* HOMEPAGE
-------------------------------------------------------------------------------------------------------------------------------------------------------- */
            sidebarOpen: false,
            goBack() {
                this.loginSection = false;
                this.homepage = true;
                this.taskPage = false;
                this.machinePage = false;
                this.cropPage = false;
                this.analysisPage = false;
                this.showPopup = false;
                this.taskUpdate = false;
                this.about = false;
                this.profilePage = false;
            },





 /* ANALYSIS PAGE
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
            region: '',
            cropType: '',
            production:'',
            regionAngola: '',
            regionBotswana: '',
            regionEswatini: '',
            regionLesotho: '',
            regionMalawi: '',
            regionMozambique: '',
            regionSouthAfrica: '',
            regionTanzania: '',
            regionZambia: '',
            regionZimbabwe: '',
            cropMaize: '',
            cropRice: '',
            cropWheat: '',
            temperature: '',
            rainfall: '',
            humidity: '',
            predictedYield: '',
            year:'',
            selectedYear:'',
            yieldProduction: '0',
            fieldSize:'',

            updateRegion() {
                // Reset all region values to 0
                this.regionAngola = 0;
                this.regionBotswana = 0;
                this.regionEswatini = 0;
                this.regionLesotho = 0;
                this.regionMalawi = 0;
                this.regionMozambique = 0;
                this.regionSouthAfrica = 0;
                this.regionTanzania = 0;
                this.regionZambia = 0;
                this.regionZimbabwe = 0;
    
                
                switch (this.region) {
                    case 'Angola': this.regionAngola = 1; break;
                    case 'Botswana': this.regionBotswana = 1; break;
                    case 'Eswatini': this.regionEswatini = 1; break;
                    case 'Lesotho': this.regionLesotho = 1; break;
                    case 'Malawi': this.regionMalawi = 1; break;
                    case 'Mozambique': this.regionMozambique = 1; break;
                    case 'South Africa': this.regionSouthAfrica = 1; break;
                    case 'Tanzania': this.regionTanzania = 1; break;
                    case 'Zambia': this.regionZambia = 1; break;
                    case 'Zimbabwe': this.regionZimbabwe = 1; break;
                }
            },

            updateAnalysisCrop() {
                // Reset all crop values to 0
                this.cropMaize = 0;
                this.cropRice = 0;
                this.cropWheat = 0;
    

                switch (this.crop) {
                    case 'Maize': this.cropMaize = 1; break;
                    case 'Rice': this.cropRice = 1; break;
                    case 'Wheat': this.cropWheat = 1; break;
                }
            },



            unitOfMeasurement() {
                switch (this.production) {
                    case 'g': 
                        this.yieldProduction = (this.predictedYield * this.fieldSize).toFixed(2); 
                        break;
                    case 'kg': 
                        this.yieldProduction = ((this.predictedYield / 1000) * this.fieldSize).toFixed(2) ;
                        break;
                    case 't': 
                        this.yieldProduction = ((this.predictedYield / 1000000) * this.fieldSize).toFixed(2); 
                        break;


                }
                console.log('Yield production:', this.yieldProduction);
            },
     


            async submitAnalysisData() {
                // Prepare the region and crop data
                await this.updateRegion();
                await this.updateAnalysisCrop();
                
    
                // Prepare the data payload for the API
                const dataPayload = {
                    HUMIDITY: this.humidity,
                    RAINFALL: this.rainfall,
                    TEMPERATURE: this.temperature,
                    TREND: 1961 - new Date().getFullYear(),
                    REGION_Angola: this.regionAngola,
                    REGION_Botswana: this.regionBotswana,
                    REGION_Eswatini: this.regionEswatini,
                    REGION_Lesotho: this.regionLesotho,
                    REGION_Malawi: this.regionMalawi,
                    REGION_Mozambique: this.regionMozambique,
                    REGION_SouthAfrica: this.regionSouthAfrica,
                    'REGION_United Republic of Tanzania': this.regionTanzania,
                    REGION_Zambia: this.regionZambia,
                    REGION_Zimbabwe: this.regionZimbabwe,
                    CROP_Maize: this.cropMaize,
                    CROP_Rice: this.cropRice,
                    CROP_Wheat: this.cropWheat,
                    HUMIDITY_TEMPERATURE: this.humidity * this.temperature 
                };
    
              try {
                    // Make the POST request to your Flask API
                    const response = await axios.post('http://localhost:5000/api/ml/predict', dataPayload);
    
                    // Handle the API response and store the predicted yield
                    this.predictedYield = response.data.predicted_yield;
            
                    // Optionally, log the prediction to the console
                    console.log("Predicted Yield:", this.predictedYield);
                    this.unitOfMeasurement();
                } catch (error) {
                    console.error("Error during prediction:", error.response?.data || error.message);
                }
                
            },


    





            /* TASK SHCEDULER
-------------------------------------------------------------------------------------------------------------------------------------------------------- */

            task: '',
            assigner: this.cUserName,
            assignee: '',
            description: '',
            status: '',
            taskList: [],
            taskToDelete: '',
            deadline: '',
            selectedTask: '',

            async addTask() {
                // Ensure all variables are strings and initialized
                const task = this.task || '';
                const assignee = this.assignee || '';
                const status = this.status || '';
                const description = this.description || '';

                // Check if any field is empty
                if (task.trim() === '' || assignee.trim() === '' || status.trim() === '' || description.trim() === '') {
                    alert('Please fill out all fields.');
                    return;
                }

                try {
                    const response = await axios.post(`http://localhost:5565/tasks/add_new_task/${this.cOrg}`, {
                        Organisation: this.cOrg,
                        Task: task,
                        Assigner: this.cUserName,
                        Assignee: this.assignee,
                        Status: this.status,
                        Description: this.description,
                        Dead_line: this.deadline,
                    });

                    if (response.status === 200) {
                        alert('Task added successfully');
                        this.clearFields(); // Clear input fields
                    } else {
                        alert('Failed to add task');
                    }
                } catch (err) {
                    console.error('Error adding task:', err.message);
                    alert('An error occurred while adding the task.');
                }
            },

            // Fetch tasks
            async fetchTasks() {
                try {
                    const response = await axios.get(`http://localhost:5565/tasks/retrieve_tasks/${this.cOrg}`);

                    if (response.status === 200) {
                        this.taskList = response.data;
                    } else {
                        alert('Failed to fetch tasks');
                    }
                } catch (err) {
                    console.error('Error fetching tasks:', err.message);
                    alert('An error occurred while fetching the tasks.');
                }
            },


            async loadTasks() {
                await this.fetchTasks();
                console.log('Tasklist', this.taskList)
            },

            // Update an existing task

            openTaskUpdate(taskId) {
                this.showPopup = true;
                this.taskUpdate = true;
                this.selectedTask = taskId;
            },

            async updateTask() {


                try {
                    const response = await axios.put(`http://localhost:5565/tasks/Update_task/${this.cOrg}/${this.selectedTask}`, {
                        Task: this.task,
                        Assigner: this.cUserName,
                        Assignee: this.assignee,
                        Status: this.status,
                        Description: this.description,
                        Dead_line: this.deadline,
                    });

                    if (response.status === 200) {
                        alert('Task updated successfully');
                    } else {
                        alert('Failed to update task');
                    }
                } catch (err) {
                    console.error('Error updating task:', err.message);
                    alert('An error occurred while updating the task.');
                }
            },

            // Delete a task
            async deleteTask(taskID) {

                try {
                    const response = await axios.delete(`http://localhost:5565/tasks/Delete_task/${this.cOrg}/${taskID}`);

                    if (response.status === 200) {
                        alert('Task deleted successfully');
                    } else {
                        alert('Failed to delete task');
                    }
                } catch (err) {
                    console.error('Error deleting task:', err.message);
                    alert('An error occurred while deleting the task.');
                }
            },

            // Clear input fields
            clearFields() {
                this.task = '';
                this.assigner = '';
                this.assignee = '';
                this.status = '';
            },

            openTask() {
                this.taskPage = true;
                this.homepage = false
            },

            checkUser() {
                console.log('cEmail:', this.cEmail);
                console.log('cOrg:', this.cOrg);
                console.log('cPassword:', this.cPassword);
                console.log('cUserName:', this.cUserName);
                console.log('cSurname:', this.cSurname);
                console.log('cUserRole:', this.cUserRole);
            },


            /* machine INVENTORY
         -------------------------------------------------------------------------------------------------------------------------------------------------------- */
            machinery: '',
            reg_number: '',
            condition: '',
            issue: '',
            machineryList: [],
            selectedMachine: '',
            machineUpdate: false,

            openMachine() {
                this.machinePage = true;
                this.homepage = false
            },

            // Add new machinery
            async addMachinery() {
                if (this.machinery.trim() === '' || this.reg_number.trim() === '' || this.condition.trim() === '' || this.issue.trim() === '') {
                    alert('Please fill out all fields.');
                    return;
                }

                try {
                    const response = await axios.post(`http://localhost:5565/machines/Add_machine/${this.cOrg}/${this.reg_number}`, {
                        Organisation: this.cOrg,
                        Machinery: this.machinery,
                        reg_number: this.reg_number,
                        Condition: this.condition,
                        Issue: this.issue
                    });

                    if (response.status === 200) {
                        alert('Machinery added successfully');
                        this.machineryList.push({
                            organisation: this.cOrg,
                            machinery: this.machinery,
                            reg_number: this.reg_number,
                            condition: this.condition,
                            issue: this.issue
                        });
                        this.clearFieldsM();
                        this.loadMachine();
                    } else {
                        alert('Failed to add machinery');
                    }
                } catch (err) {
                    console.error('Error adding machinery:', err.message);
                    alert('An error occurred while adding the machinery.');
                }
            },

            // Fetch all machinery
            async fetchMachinery() {
                try {
                    const response = await axios.get(`http://localhost:5565/machines/retrieve_all_machines/${this.cOrg}`);

                    if (response.status === 200) {
                        this.machineryList = response.data;
                    } else {
                        alert('Failed to fetch machinery');
                    }
                } catch (err) {
                    console.error('Error fetching machinery:', err.message);
                    alert('An error occurred while fetching the machinery.');
                }
            },

            async loadMachine() {
                await this.fetchMachinery();
                console.log('Machine list', this.machineryList)
            },

            // Update existing machinery
            async updateMachinery() {

                try {
                    const response = await axios.put(`http://localhost:5565/machines/Update_machine/${this.cOrg}/${this.selectedMachine}`, {
                        Organisation: this.cOrg,
                        Machinery: this.machinery,
                        reg_number: this.reg_number,
                        Condition: this.condition,
                        Issue: this.issue,
                    });

                    if (response.status === 200) {
                        alert('Machinery updated successfully');
                    } else {
                        alert('Failed to update machinery');
                    }
                } catch (err) {
                    console.error('Error updating machinery:', err.message);
                    alert('An error occurred while updating the machinery.');
                }
            },

            openMachineUpdate(machineId) {
                this.showPopup = true;
                this.machineUpdate = true;
                this.selectedMachine = machineId;
            },


            // Delete machinery
            async deleteMachinery(machineID) {


                try {
                    const response = await axios.delete(`http://localhost:5565/machines/Delete_machine/${this.cOrg}/${machineID}`);

                    if (response.status === 200) {
                        alert('Machinery deleted successfully');
                        this.loadMachine;
                    } else {
                        alert('Failed to delete machinery');
                    }
                } catch (err) {
                    console.error('Error deleting machinery:', err.message);
                    alert('An error occurred while deleting the machinery.');
                }
            },



            // Clear input fields
            clearFieldsM() {
                this.machinery = '';
                this.reg_number = '';
                this.condition = '';
                this.issue = '';
            },



            /* CROP INVENTORY
            -------------------------------------------------------------------------------------------------------------------------------------------------------- */
            // Crop inventory data
            newCropType: '',
            newCropYield: '',
            cropList: [],
            selectedCrop: '',
            cropUpdate: false,


            // Fetch all crops for an organization
            async fetchCrops() {
                try {
                    const response = await axios.get(`http://localhost:5565/crops/Get_crops/${this.cOrg}`);

                    if (response.status === 200) {
                        this.cropList = response.data;
                    } else {
                        alert('Failed to fetch crops');
                    }
                } catch (err) {
                    console.error('Error fetching crops:', err.message);
                    alert('An error occurred while fetching crops.');
                }
            },

            async loadCrops() {
                await this.fetchCrops();
                console.log('Crop list', this.cropList)
            },

            // Fetch a single type of crop
            async fetchCropByType() {
                try {
                    const response = await axios.get(`http://localhost:5565/Get_one_type/${this.cOrg}/${this.cropType}`);

                    if (response.status === 200) {
                        // Handle the single crop type data here
                        console.log('Crop details:', response.data);
                    } else {
                        alert('Failed to fetch crop type');
                    }
                } catch (err) {
                    console.error('Error fetching crop type:', err.message);
                    alert('An error occurred while fetching the crop type.');
                }
            },

            // Add a new crop record
            async addCrop() {
                if (this.newCropType.trim() === '' || this.newCropYield.trim() === '') {
                    alert('Please fill out all fields.');
                    return;
                }

                try {
                    const response = await axios.post('http://localhost:5565/crops/Add_a_crop', {
                        Organisation: this.cOrg,
                        Crop: this.newCropType,
                        Yield: this.newCropYield,
                    });

                    if (response.status === 200) {
                        alert('Crop added successfully');
                        this.clearCropFields();
                        this.loadCrops();
                    } else {
                        alert('Failed to add crop');
                    }
                } catch (err) {
                    console.error('Error adding crop:', err.message);
                    alert('An error occurred while adding the crop.');
                }
            },

            // Update an existing crop record
            async updateCrop() {
                try {
                    const response = await axios.put(`http://localhost:5565/crops/Update_crop/${this.selectedCrop}`, {
                        Crop: this.newCropType,
                        Yield: this.newCropYield
                    });

                    if (response.status === 200) {
                        alert('Crop updated successfully');
                        await this.fetchCrops();
                    } else {
                        alert('Failed to update crop');
                    }
                } catch (err) {
                    console.error('Error updating crop:', err.message);
                    alert('An error occurred while updating the crop.');
                }
            },

            openCropUpdate(cropId) {
                this.showPopup = true;
                this.cropUpdate = true;
                this.selectedCrop = cropId;
            },


            // Delete a crop record
            async deleteCrop(cropId) {
                try {
                    const response = await axios.delete(`http://localhost:5565/crops/Delete_crop/${cropId}`);

                    if (response.status === 200) {
                        alert('Crop deleted successfully');
                        this.loadCrops();
                    } else {
                        alert('Failed to delete crop');
                    }
                } catch (err) {
                    console.error('Error deleting crop:', err.message);
                    alert('An error occurred while deleting the crop.');
                }
            },

            // Clear crop input fields
            clearCropFields() {
                this.cropType = '';
                this.cropYield = '';
            },



            openCrop() {
                this.cropPage = true;
                this.homepage = false
            },


            /* Profile
            -------------------------------------------------------------------------------------------------------------------------------------------------------- */

            openProfile() {
                this.profilePage = true;
                this.homepage = false
            },


            /* Profile
            -------------------------------------------------------------------------------------------------------------------------------------------------------- */

            openAnalysis() {
                this.analysisPage = true;
                this.homepage = false
            },

            /* ABOUT
            -------------------------------------------------------------------------------------------------------------------------------------------------------- */

            openAbout() {
                this.about = true;
                this.homepage = false
            },

            /* init
 -------------------------------------------------------------------------------------------------------------------------------------------------------- */

            async init() {

                const storedProfile = JSON.parse(localStorage.getItem('profile'));
                if (storedProfile) {
                    this.cEmail = storedProfile.email;
                    this.cOrg = storedProfile.organisation;
                    this.cPassword = storedProfile.password;
                    this.cUserName = storedProfile.userName;
                    this.cSurname = storedProfile.surname;
                    this.cUserRole = storedProfile.userRole;

                    // Automatically log in the user
                    this.loginSection = false;
                    this.homepage = true; // Set
                };

                await this.loadTasks();
                await this.loadMachine();
                await this.loadCrops();
                this.checkUser();

            },





        }
    });
});


