import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { SystemReport } from '../model/system-report.model';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class SystemReportService {
    constructor(
        @InjectModel(SystemReport)
        private readonly model: ReturnModelType<typeof SystemReport>,
    ) {}

    create(reportDTO: SystemReport): Promise<SystemReport> {
        const report = new this.model(reportDTO);
        return report.save();
    }
}
