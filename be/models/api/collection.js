export const formatCollectionResponse = (collection) => {
	return {
		id: collection.id,
		name: collection.name,
		isPublic: collection.isPublic,
		createdAt: collection.createdAt,
	};
};
