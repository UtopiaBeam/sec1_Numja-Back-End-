import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { SuspendOrActivateDTO } from './admin.dto';
import { UserRole } from '../enum/user.enum';
import { AdminTransferTransactionDTO } from '../transaction/transaction.dto';
import { UserId } from '../decorators/user-id.decorator';
import { TransactionService } from '../transaction/transaction.service';
import { TransactionType } from '../enum/transaction.enum';

@ApiBearerAuth()
@ApiTags('Admin')
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.Admin)
@Controller('admin')
export class AdminController {
    constructor(
        private readonly service: AdminService,
        private readonly transactionService: TransactionService,
    ) {}

    @Patch('suspend')
    suspend(@Body() { userId }: SuspendOrActivateDTO) {
        return this.service.suspend(userId);
    }

    @Patch('activate')
    activate(@Body() { userId }: SuspendOrActivateDTO) {
        return this.service.activate(userId);
    }

    @Post('transfer')
    transfer(
        @UserId() issuerId: string,
        @Body() transactionDTO: AdminTransferTransactionDTO,
    ) {
        return this.transactionService.createTransaction({
            type: TransactionType.Transfer,
            issuerId,
            ...transactionDTO,
        });
    }
}
