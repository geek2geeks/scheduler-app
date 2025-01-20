// Previous imports remain the same...

function Home() {
  // Previous state declarations remain the same...

  // Updated useEffect for periodic refresh
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const savedBookings = await getSchedules();
        setBookings(savedBookings.map(booking => ({
          ...booking,
          date: new Date(booking.date)
        })));
      } catch (error) {
        console.error('Error loading bookings:', error);
      }
    };

    // Initial fetch
    fetchBookings();

    // Set up periodic refresh (every 30 seconds)
    const interval = setInterval(fetchBookings, 30000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Rest of the component remains the same...
}