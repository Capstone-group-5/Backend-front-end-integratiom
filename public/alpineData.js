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
            async updateMachinery(index) {
                const updatedMachinery = this.machineryList[index];

                try {
                    const response = await axios.put(`http://localhost:5565/machinery/Update_machine/${this.cOrg}/${updatedMachinery.reg_number}`, {
                        organisation: updatedMachinery.organisation,
                        machinery: updatedMachinery.machinery,
                        reg_number: updatedMachinery.reg_number,
                        condition: updatedMachinery.condition,
                        issue: updatedMachinery.issue
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


            // Delete machinery
            async deleteMachinery(index) {
                const machineryToDelete = this.machineryList[index];

                try {
                    const response = await axios.delete(`http://localhost:5565/machinery/Delete_machine/${this.cOrg}/${machineryToDelete.reg_number}`);

                    if (response.status === 200) {
                        alert('Machinery deleted successfully');
                        this.machineryList.splice(index, 1); // Remove from the list
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
            cOrg: '',  // Organization
            cropType: '',
            cropYield: '',
            cropList: [],
            selectedCropId: '',  // Tracks selected crop for updates or deletes

            // Fetch all crops for an organization
            async fetchCrops() {
                try {
                    const response = await axios.get(`http://localhost:5565/Get_crops/${this.cOrg}`);

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
                if (this.cOrg.trim() === '' || this.cropType.trim() === '' || this.cropYield.trim() === '') {
                    alert('Please fill out all fields.');
                    return;
                }

                try {
                    const response = await axios.post('http://localhost:5565/Add_a_crop', {
                        Organisation: this.cOrg,
                        Crop: this.cropType,
                        Yield: this.cropYield
                    });

                    if (response.status === 200) {
                        alert('Crop added successfully');
                        this.clearCropFields();
                        this.fetchCrops(); // Refresh the crop list
                    } else {
                        alert('Failed to add crop');
                    }
                } catch (err) {
                    console.error('Error adding crop:', err.message);
                    alert('An error occurred while adding the crop.');
                }
            },

            // Update an existing crop record
            async updateCrop(index) {
                const cropToUpdate = this.cropList[index];
                this.selectedCropId = cropToUpdate.cropRecord_Id;

                try {
                    const response = await axios.put(`http://localhost:5565/Update_crop/${this.selectedCropId}`, {
                        Crop: cropToUpdate.Crop,
                        Yield: cropToUpdate.Yield
                    });

                    if (response.status === 200) {
                        alert('Crop updated successfully');
                        this.fetchCrops();
                    } else {
                        alert('Failed to update crop');
                    }
                } catch (err) {
                    console.error('Error updating crop:', err.message);
                    alert('An error occurred while updating the crop.');
                }
            },

            // Delete a crop record
            async deleteCrop(index) {
                const cropToDelete = this.cropList[index];
                this.selectedCropId = cropToDelete.cropRecord_Id;

                try {
                    const response = await axios.delete(`http://localhost:5565/Delete_crop/${this.selectedCropId}`);

                    if (response.status === 200) {
                        alert('Crop deleted successfully');
                        this.cropList.splice(index, 1); // Remove from the list
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

            cropUpdate: false,

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
                this.checkUser();

            },





        }
    });
});


