import { Project, ContentFormat, Channel, Kpi, Producer, Coordinator } from './models';

export default class CreateProductDTO {
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
    producerIds: string[];
    coordinatorIds: string[];
    fileIds: string[];
    imageId: string | object;
    constructor(data: Project) {
        this.name = data.name
        this.requestNumber = data.requestNumber
        this.contractNumber = data.contractNumber
        this.contractDate = data.contractDate
        this.advancePayment = data.advancePayment
        this.igk = data.igk
        this.budget = data.budget
        this.sessionId = data.sessionId
        this.goal = data.goal
        this.description = data.description
        this.completionDate = data.completionDate
        this.statusId = data.statusId
        this.contentThematicIds = data.contentThematicIds
        this.contentDirectionId = data.contentDirectionId
        this.contentFormats = data.contentFormats
        this.channels = data.channels
        this.kpis = data.kpis
        this.ownerId = data.ownerId
        this.producerIds = data.producerIds.map((producer: Producer) => {
            return producer.name
        }) || data.producerIds
        this.coordinatorIds = data.coordinatorIds.map((coordinator: Coordinator) => {
            return coordinator.name
        }) || data.coordinatorIds
        this.fileIds = data.fileIds
        this.imageId = data.imageId.uid || data.imageId

    }

}