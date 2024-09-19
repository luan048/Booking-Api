const bookings = []

function findAllBookings() {
    return bookings
}

function createBooking(booking) {
    bookings.push(booking)
}

export function BookingRepository() {
    return {
        findAllBookings,
        createBooking
    }
}