import Event from "../../models/eventModel.js";
import config from "../../core/config.js";
import AppError from "../../helper/appError.js";
import catchAsync from "../../helper/catchAsync.js";
import APIFeatures from "../../helper/apiFeatures.js";

export const createEvent = catchAsync(async (req, res, next) => {
    const event = await Event.create(req.body);
    res.status(201).json({
        status: "success",
        data: event,
    });
});
export const getAllEvent = catchAsync(async (req, res, next) => {
    // Execute the query
    const features = new APIFeatures(Event.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const events = await features.query;

    // Send Response
    res.status(200).json({
        status: "success",
        results: events.length,
        data: events,
    });
});
export const getOneEvent = catchAsync(async (req, res, next) => {
    const event = await Event.findById(req.params.id);

    // Return an error if doc is not found
    if (!event) {
        return next(new AppError("No Event found for given id", 404));
    }

    res.status(200).json({
        status: "success",
        data: event,
    });
});

export const updateEvent = catchAsync(async (req, res, next) => {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    // Return an error if doc is not found
    if (!event) {
        return next(new AppError("No event found with given id", 404));
    }

    res.status(200).json({
        status: "success",
        data: event,
    });
});

export const deleteEvent = catchAsync(async (req, res, next) => {
    const event = await Event.findByIdAndDelete(req.params.id);

    // Return an error if doc is not found
    if (!event) {
        return next(new AppError("No document was found with given id", 404));
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
});
