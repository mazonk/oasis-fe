
export function mapToUser(data: any): any {
    return {
        userId: data.userTypeId,
        memberId: data.memberId,
        email: data.email,
        role: data.role,
        member: mapToMember(data.member),
    };
}

export function mapToMember(data: any): any {
    return {
        memberId: data.memberId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
    };
}

export function mapToActivity(data: any): any {
    return {
        activityId: data.activityId,
        title: data.title,
        description: data.description,
        minMember: data.minMember,
        maxMember: data.maxMember,
        categoryId: data.category,
        activityCategory: mapToActivityCategory(data.activityCategory), 
    };
}

export function mapToActivityCategory(data: any): any {
    return {
        categoryId: data.categoryId,
        name: data.name,
        activities: data.activities,
    };
}