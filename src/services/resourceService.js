const API_URL = '/api/resources';

const getAuthHeader = () => ({
    'Authorization': `Bearer ${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : ''}`,
    'Content-Type': 'application/json'
});

export const resourceService = {
    // --- Generic Methods ---
    getAll: async (type) => {
        try {
            const url = type ? `${API_URL}?type=${type}` : API_URL;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch resources');
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    },

    create: async (data) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: getAuthHeader(),
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Failed to create resource');
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    update: async (id, data) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: getAuthHeader(),
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Failed to update resource');
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : ''}`
                }
            });
            if (!response.ok) throw new Error('Failed to delete resource');
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    // --- Specific Type Helpers (Mapping old service methods) ---

    // Industry Reports
    getIndustryReports: () => resourceService.getAll('report'),
    addIndustryReport: (report) => resourceService.create({ ...report, type: 'report' }),
    updateIndustryReport: (id, report) => resourceService.update(id, report),
    deleteIndustryReport: (id) => resourceService.delete(id),

    // Regulatory Updates
    getRegulatoryUpdates: () => resourceService.getAll('update'),
    addRegulatoryUpdate: (update) => resourceService.create({ ...update, type: 'update' }),
    updateRegulatoryUpdate: (id, update) => resourceService.update(id, update),
    deleteRegulatoryUpdate: (id) => resourceService.delete(id),

    // Templates
    getTemplates: () => resourceService.getAll('template'),
    addTemplate: (template) => resourceService.create({ ...template, type: 'template' }),
    updateTemplate: (id, template) => resourceService.update(id, template),
    deleteTemplate: (id) => resourceService.delete(id),

    // Case Studies
    getCaseStudies: () => resourceService.getAll('casestudy'),
    getCaseStudyById: async (id) => {
        // Since we don't have getById specific in Generic, let's use getAll and find for now
        // OR add getById to generic. Generic getById shouldn't strictly require type
        // Let's implement proper getById via fetching specific ID if API supports it (it does: GET /:id)
        try {
            // Reusing generic getById pattern
            const response = await fetch(`${API_URL}/${id}`); // Assumes API returns item causing no check of type
            if (!response.ok) throw new Error('Not found');
            return await response.json();
        } catch (e) { return null; }
    },
    createCaseStudy: (study) => resourceService.create({ ...study, type: 'casestudy' }),
    updateCaseStudy: (id, study) => resourceService.update(id, study),
    deleteCaseStudy: (id) => resourceService.delete(id),
};
