const bookings = []

function findAll() {
    return bookings
}

function create(booking) {
    bookings.push(booking)
}

export function BookingRepository() {
    return {
        findAll,
        create
    }
}