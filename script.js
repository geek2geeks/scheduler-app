document.addEventListener('DOMContentLoaded', function() {
    const scheduler = document.getElementById('scheduler');
    const confirmationModal = document.getElementById('confirmationModal');
    const successModal = document.getElementById('successModal');
    const selectedSlotText = document.getElementById('selectedSlot');
    const confirmBtn = document.getElementById('confirmBooking');
    const cancelBtn = document.getElementById('cancelBooking');
    const closeSuccessBtn = document.getElementById('closeSuccess');

    let selectedTimeSlot = null;

    // Generate time slots for the next 7 days
    function generateTimeSlots() {
        const days = 7;
        const startHour = 9; // 9 AM
        const endHour = 17; // 5 PM
        const timeSlots = [];

        for (let day = 0; day < days; day++) {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + day);

            for (let hour = startHour; hour < endHour; hour++) {
                const timeSlot = {
                    date: new Date(currentDate).setHours(hour, 0, 0, 0),
                    booked: false
                };
                timeSlots.push(timeSlot);
            }
        }

        return timeSlots;
    }

    // Format date and time
    function formatDateTime(date) {
        return new Date(date).toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    }

    // Create time slot elements
    function createTimeSlotElements(timeSlots) {
        scheduler.innerHTML = '';
        timeSlots.forEach(slot => {
            const slotElement = document.createElement('div');
            slotElement.className = `time-slot ${slot.booked ? 'booked' : 'available'}`;
            slotElement.textContent = formatDateTime(slot.date);
            
            if (!slot.booked) {
                slotElement.addEventListener('click', () => showConfirmation(slot));
            }

            scheduler.appendChild(slotElement);
        });
    }

    // Show confirmation modal
    function showConfirmation(slot) {
        selectedTimeSlot = slot;
        selectedSlotText.textContent = formatDateTime(slot.date);
        confirmationModal.style.display = 'block';
    }

    // Hide modals
    function hideModals() {
        confirmationModal.style.display = 'none';
        successModal.style.display = 'none';
    }

    // Book the time slot
    function bookTimeSlot() {
        if (selectedTimeSlot) {
            selectedTimeSlot.booked = true;
            createTimeSlotElements(timeSlots); // Refresh the display
            hideModals();
            successModal.style.display = 'block';
            selectedTimeSlot = null;
        }
    }

    // Event listeners
    confirmBtn.addEventListener('click', bookTimeSlot);
    cancelBtn.addEventListener('click', hideModals);
    closeSuccessBtn.addEventListener('click', hideModals);

    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === confirmationModal || event.target === successModal) {
            hideModals();
        }
    });

    // Initialize the scheduler
    const timeSlots = generateTimeSlots();
    createTimeSlotElements(timeSlots);
});
