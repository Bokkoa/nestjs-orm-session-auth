import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
    ( data: never, context: ExecutionContext ) => {
        const request = context.switchToHttp().getRequest();

        // getting user info
        return request.currentUser;
    }
)