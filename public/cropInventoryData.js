document.addEventListener('alpine:init', () => {
    Alpine.data('cropInventoryManagement', () => ({
        organisation: '',
        crop: '',
        yield: '',
        cropList: [], // Initialize an empty crop list

        // Function to add a new crop record
        async addCrop() {
            if (this.organisation.trim() === '' || this.crop.trim() === '' || this.yield === '') {
                alert('Please fill out all fields.');
                return;
            }

            try {
                const response = await axios.post(`http://localhost:5565/crops/add_new_crop`, {
                    organisation: this.organisation,
                    crop: this.crop,
                    yield: this.yield
                });

                if (response.status === 200) {
                    alert('Crop added successfully');
                    this.cropList.push({
                        organisation: this.organisation,
                        crop: this.crop,
                        yield: this.yield
                    });
                    this.clearFields(); // Clear input fields after addition
                } else {
                    alert('Failed to add crop');
                }
            } catch (err) {
                console.error('Error adding crop:', err.message);
                alert('An error occurred while adding the crop.');
            }
        },

        // Function to fetch crop records
        async fetchCrops() {
            try {
                const response = await axios.get(`http://localhost:5565/crops/get_all_crops`);

                if (response.status === 200) {
                    this.cropList = response.data; // Populate crop list with response data
                } else {
                    alert('Failed to fetch crops');
                }
            } catch (err) {
                console.error('Error fetching crops:', err.message);
                alert('An error occurred while fetching the crops.');
            }
        },

        // Function to update an existing crop record
        async updateCrop(index) {
            const updatedCrop = this.cropList[index];

            try {
                const response = await axios.put(`http://localhost:5565/crops/update_crop/${updatedCrop.id}`, {
                    organisation: updatedCrop.organisation,
                    crop: updatedCrop.crop,
                    yield: updatedCrop.yield
                });

                if (response.status === 200) {
                    alert('Crop updated successfully');
                } else {
                    alert('Failed to update crop');
                }
            } catch (err) {
                console.error('Error updating crop:', err.message);
                alert('An error occurred while updating the crop.');
            }
        },

        // Function to delete a crop record
        async deleteCrop(index) {
            const cropToDelete = this.cropList[index];

            try {
                const response = await axios.delete(`http://localhost:5565/crops/delete_crop/${cropToDelete.id}`);

                if (response.status === 200) {
                    alert('Crop deleted successfully');
                    this.cropList.splice(index, 1); // Remove the deleted crop from the list
                } else {
                    alert('Failed to delete crop');
                }
            } catch (err) {
                console.error('Error deleting crop:', err.message);
                alert('An error occurred while deleting the crop.');
            }
        },

        // Clear input fields
        clearFields() {
            this.organisation = '';
            this.crop = '';
            this.yield = '';
        }
    }));
});
