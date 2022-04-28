import { Project, ContentFormat, Channel, Kpi } from './models';

export default class ValuesDTO {
    name: string;
    requestNumber: string;
    contractNumber: string;
    contractDate: string;
    advancePayment: boolean;
    igk: string;
    budget: number;
    sessionId: string;
    goal: string;
    description: string;
    completionDate: string;
    statusId: string;
    contentThematicIds: string[];
    contentDirectionId: string;
    contentFormats: ContentFormat[];
    channels: Channel[];
    kpis: Kpi[];
    ownerId: string;
    producerIds: any[];
    coordinatorIds: any[];
    fileIds: string[];
    imageId: any;
    constructor(data?: Project) {
        this.name = data?.name || ''
        this.requestNumber = data?.requestNumber || ''
        this.contractNumber = data?.contractNumber || ''
        this.contractDate = data?.contractDate || ''
        this.advancePayment = data?.advancePayment || false
        this.igk = data?.igk || ''
        this.budget = data?.budget || 0
        this.sessionId = data?.sessionId || ''
        this.goal = data?.goal || ''
        this.description = data?.description || ''
        this.completionDate = data?.completionDate || ''
        this.statusId = data?.statusId || ''
        this.contentThematicIds = data?.contentThematicIds || []
        this.contentDirectionId = data?.contentDirectionId || ''
        this.contentFormats = data?.contentFormats || []
        this.channels = data?.channels || []
        this.kpis = data?.kpis || []
        this.ownerId = data?.ownerId || ''
        this.producerIds = data?.producerIds || []
        this.coordinatorIds = data?.coordinatorIds || []
        this.fileIds = data?.fileIds || []
        this.imageId = data?.imageId || {}

    }

}