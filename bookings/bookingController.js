export function BookingController(service) {
    function index(req) {
        const bookings = service.findAllBookings()
        return {code: 200, body: {bookings}}
    }

    function save(req) {
        const {roomId, guestName, checkInDate, checkOutDate} = req.body
        const user = req.user

        if(!roomId || !guestName || !checkInDate || !checkOutDate) {
            return {code: 400, body: {message: 'All fields are required'}}
        }

        const booking = service.createBooking({user, roomId, guestName, checkInDate, checkOutDate})

        return {code: 201, body: {message: 'Booking created sucessfully', booking}}
    }

    return {index, save}
}