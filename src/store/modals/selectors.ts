import { createSelector } from 'reselect';
import { TApplicationState } from "../applicationState";

const stateModals = (state: TApplicationState) => state.modals;

export const selectIsOpenModal = createSelector(stateModals, (state) => state.isOpen)
export const selectTypeModal = createSelector(stateModals, (state) => state.typeModal)
export const selectDataModal = createSelector(stateModals, (state) => state.data)

export const selectCredentialsModal = createSelector(
    selectIsOpenModal,
    selectTypeModal,
    selectDataModal,
    (isOpen, typeModal, data) => ({ isOpen, typeModal, data })
)