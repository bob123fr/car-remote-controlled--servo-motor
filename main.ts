input.onButtonPressed(Button.A, function () {
    for (let index = 0; index < 10; index++) {
        pins.digitalWritePin(DigitalPin.P0, 1)
        pins.digitalWritePin(DigitalPin.P1, 1)
        basic.pause(200)
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 0)
        basic.pause(200)
        pins.digitalWritePin(DigitalPin.P0, 1)
        pins.digitalWritePin(DigitalPin.P1, 1)
        basic.pause(200)
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 0)
        basic.pause(200)
    }
})
input.onButtonPressed(Button.AB, function () {
    for (let index = 0; index < 4; index++) {
        for (let index = 0; index <= 180; index++) {
            servos.P1.setAngle(index)
        }
        basic.pause(500)
        for (let index = 0; index <= 180; index++) {
            servos.P1.setAngle(180 - index)
        }
    }
})
radio.onReceivedValue(function (name, value) {
    if (name.compare("y") == 0) {
        reverse = value
    }
    if (name.compare("x") == 0) {
        right = value
    }
    right_motor = -1 * reverse - right
    left_motor = -1 * reverse + right
})
let left_motor = 0
let right_motor = 0
let right = 0
let reverse = 0
radio.setGroup(1)
servos.P0.setAngle(90)
basic.showLeds(`
    . # # # .
    . # # # .
    # . . . #
    . # # # .
    . # # # .
    `)
basic.forever(function () {
    radio.sendValue("x", input.acceleration(Dimension.X))
    radio.sendValue("y", input.acceleration(Dimension.Y))
    if (left_motor > 0) {
        pins.analogWritePin(AnalogPin.P16, 0)
        pins.analogWritePin(AnalogPin.P0, Math.abs(left_motor))
    } else {
        pins.analogWritePin(AnalogPin.P0, 0)
        pins.analogWritePin(AnalogPin.P16, Math.abs(left_motor))
    }
    if (right_motor > 0) {
        pins.analogWritePin(AnalogPin.P12, 0)
        pins.analogWritePin(AnalogPin.P8, Math.abs(right_motor))
    } else {
        pins.analogWritePin(AnalogPin.P8, 0)
        pins.analogWritePin(AnalogPin.P12, Math.abs(right_motor))
    }
})
