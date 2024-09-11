document.addEventListener('alpine:init', () => {
    Alpine.data('machineryManagement', () => ({
        organisation: '',
        machinery: '',
        reg_number: '',
        condition: '',
        issue: '',
        machineryList: [],

        // Add new machinery
        async addMachinery() {
            if (this.organisation.trim() === '' || this.machinery.trim() === '' || this.reg_number.trim() === '' || this.condition.trim() === '' || this.issue.trim() === '') {
                alert('Please fill out all fields.');
                return;
            }

            try {
                const response = await axios.post(`http://localhost:5565/machinery/add_new_machinery`, {
                    organisation: this.organisation,
                    machinery: this.machinery,
                    reg_number: this.reg_number,
                    condition: this.condition,
                    issue: this.issue
                });

                if (response.status === 200) {
                    alert('Machinery added successfully');
                    this.machineryList.push({
                        organisation: this.organisation,
                        machinery: this.machinery,
                        reg_number: this.reg_number,
                        condition: this.condition,
                        issue: this.issue
                    });
                    this.clearFields();
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
                const response = await axios.get(`http://localhost:5565/machinery/get_all_machinery`);

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

        // Update existing machinery
        async updateMachinery(index) {
            const updatedMachinery = this.machineryList[index];

            try {
                const response = await axios.put(`http://localhost:5565/machinery/update_machinery/${updatedMachinery.id}`, {
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
                const response = await axios.delete(`http://localhost:5565/machinery/delete_machinery/${machineryToDelete.id}`);

                if (response.status === 200) {
                    alert('Machinery deleted successfully');
                    this.machineryList.splice(index, 1);
                } else {
                    alert('Failed to delete machinery');
                }
            } catch (err) {
                console.error('Error deleting machinery:', err.message);
                alert('An error occurred while deleting the machinery.');
            }
        },

        // Clear input fields
        clearFields() {
            this.organisation = '';
            this.machinery = '';
            this.reg_number = '';
            this.condition = '';
            this.issue = '';
        }
    }));
});
