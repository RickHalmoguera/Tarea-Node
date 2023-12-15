import * as fs from 'fs'

interface Room {
    type: string
    room_number: number
    description: string
    offer: boolean
    price: number
    discount: number
    cancelation: string 
    amenities: string[]
}


const data: string = fs.readFileSync('./rooms.json', { encoding: 'utf8', flag: 'r' })
const rooms: Room[] = JSON.parse(data)
rooms.sort((a:Room, b:Room) => a.price - b.price)
const sortedData: string = JSON.stringify(rooms, null, 2)
fs.writeFileSync('./sorted_rooms.json', sortedData, { encoding: 'utf8', flag: 'w' })
const csvHeaders = Object.keys(rooms[0]).join(',')
const csvContent = rooms.map((room:Room) => Object.values(room).join(',')).join('\n')
fs.writeFileSync('./rooms.csv', csvHeaders + '\n' + csvContent, { encoding: 'utf8', flag: 'w' })
console.log('Sorted JSON file created, cheaper firts')
console.log('CSV file created')
