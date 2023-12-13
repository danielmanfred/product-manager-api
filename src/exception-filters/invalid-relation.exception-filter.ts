import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { InvalidRalationError } from "./../errors/invalid-relation.error";

@Catch(InvalidRalationError)
export class InvalidRelationExceptionFilter extends BaseExceptionFilter {
    catch(exception: InvalidRalationError, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        return response.status(422).json({
            statusCode: 422,
            message: exception.message
        });
    }
}
