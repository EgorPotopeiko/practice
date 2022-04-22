export module namespace {

    export interface ContentFormat {
        id: string;
        contentCount: number;
        typeId: string;
        submissionFormId: string;
    }

    export interface Channel {
        id: string;
        name: string;
        link: string;
        planPublicationCount: number;
        internetResourceId: string;
    }

    export interface Kpi {
        id: string;
        planCount: number;
        typeId: string;
    }

    export interface Project {
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
        imageId: string;
    }

    export interface RootObject {
        project: Project;
        image: string;
        files: string[];
    }

}
