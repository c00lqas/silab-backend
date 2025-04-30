import { ClassRoom, DaysOfWeek } from "@prisma/client";
import {
  IAddClassRequestBody,
  IGetClassResponseBody,
} from "../interfaces/class.interface";
import { IBaseResponse } from "../interfaces/global.interface";
import db from "../prisma/client.prisma";
import {
  UnauthorizedError,
  ConflictError,
  NotFoundError,
} from "../utils/HttpErrors/HttptErrors";
import { Request } from "express";

export const SAddClass = async (
  body: IAddClassRequestBody,
  req: Request
): Promise<IBaseResponse> => {
  try {
    const { name, room, day } = body;

    if (req.user?.role !== "LABORAN")
      throw new UnauthorizedError("User not allowed to add subject");

    const isSubjectExist = await db.mst_class.findFirst({
      where: {
        name: name,
      },
    });

    if (isSubjectExist) throw new ConflictError("Subject already exist");

    await db.mst_class.create({
      data: {
        ...body,
        day: day as DaysOfWeek,
        room: room as ClassRoom,
        created_by: req.user?.id!,
      },
    });

    return {
      status: true,
      message: "Class added",
    };
  } catch (error) {
    throw error;
  }
};

export const SGetAllClasses = async (): Promise<
  IBaseResponse<IGetClassResponseBody[]>
> => {
  try {
    const classesData = await db.mst_class.findMany({
      where: {
        deleted_at: null,
      },
      include: {
        participants: {
          select: {
            userId: true,
          },
        },
      },
    });

    const data: IGetClassResponseBody[] = classesData.map((classData) => ({
      id: classData.id,
      subjectId: classData.subjectId,
      name: classData.name,
      quota: classData.quota,
      isFull: classData.quota === classData.participants.length,
      room: classData.room,
      day: classData.day,
      startAt: classData.startAt,
      endAt: classData.endAt,
    }));

    return {
      status: true,
      message: "Success",
      data,
    };
  } catch (error) {
    throw error;
  }
};

export const SGetClassById = async (
  id: string
): Promise<IBaseResponse<IGetClassResponseBody>> => {
  try {
    const classData = await db.mst_class.findUnique({
      where: {
        id,
        deleted_at: null,
      },
      include: {
        participants: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!classData) throw new NotFoundError("Class not found!");

    const data: IGetClassResponseBody = {
      id: classData.id,
      subjectId: classData.subjectId,
      name: classData.name,
      quota: classData.quota,
      isFull: classData.quota === classData.participants.length,
      room: classData.room,
      day: classData.day,
      startAt: classData.startAt,
      endAt: classData.endAt,
    };

    return {
      status: true,
      message: "Success",
      data,
    };
  } catch (error) {
    throw error;
  }
};
