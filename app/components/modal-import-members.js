import ModalComponent from 'ghost-admin/components/modal-base';
import ghostPaths from 'ghost-admin/utils/ghost-paths';
import {computed} from '@ember/object';

export default ModalComponent.extend({
    labelText: 'Select or drag-and-drop a CSV File',

    response: null,
    closeDisabled: false,

    // Allowed actions
    confirm: () => {},

    uploadUrl: computed(function () {
        return `${ghostPaths().apiRoot}/members/csv/`;
    }),

    actions: {
        uploadStarted() {
            this.set('closeDisabled', true);
        },

        uploadFinished() {
            this.set('closeDisabled', false);
        },

        uploadSuccess(response) {
            this.set('response', response.meta.stats);
            // invoke the passed in confirm action to refresh member data
            this.confirm();
        },

        confirm() {
            // noop - we don't want the enter key doing anything
        },

        closeModal() {
            if (!this.closeDisabled) {
                this._super(...arguments);
            }
        }
    }
});
