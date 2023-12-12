import { ArgumentsHost, Catch, ExceptionFilter, HttpServer } from "@nestjs/common";
import { AbstractHttpAdapter, BaseExceptionFilter, HttpAdapterHost } from "@nestjs/core";

@Catch()
export class CatchAllErrorsExceptionFilter extends BaseExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void {
        return super.catch(exception, host);
    }
}
