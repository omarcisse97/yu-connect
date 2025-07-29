import { GENDER } from "@/app/lib/definitions-avatar";
import { User, Users } from "@/app/lib/definitions";

const firstNames = [
    'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn', 'Sage', 'River',
    'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason', 'Isabella', 'William',
    'Charlotte', 'James', 'Amelia', 'Benjamin', 'Mia', 'Lucas', 'Harper', 'Henry', 'Evelyn', 'Alexander',
    'Abigail', 'Michael', 'Emily', 'Daniel', 'Elizabeth', 'Matthew', 'Mila', 'Jackson', 'Ella', 'Sebastian',
    'Grace', 'David', 'Victoria', 'Carter', 'Aria', 'Wyatt', 'Scarlett', 'Jayden', 'Chloe', 'John'
];

const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
    'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
    'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
    'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
    'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'
];

const domains = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 
    'protonmail.com', 'fastmail.com', 'zoho.com', 'aol.com', 'mail.com'
];

const locations = [
    'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ',
    'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA',
    'Austin, TX', 'Jacksonville, FL', 'Fort Worth, TX', 'Columbus, OH', 'Charlotte, NC',
    'San Francisco, CA', 'Indianapolis, IN', 'Seattle, WA', 'Denver, CO', 'Washington, DC',
    'Boston, MA', 'El Paso, TX', 'Nashville, TN', 'Detroit, MI', 'Oklahoma City, OK',
    'Portland, OR', 'Las Vegas, NV', 'Memphis, TN', 'Louisville, KY', 'Baltimore, MD',
    'Milwaukee, WI', 'Albuquerque, NM', 'Tucson, AZ', 'Fresno, CA', 'Sacramento, CA',
    'Kansas City, MO', 'Mesa, AZ', 'Atlanta, GA', 'Omaha, NE', 'Colorado Springs, CO',
    'Raleigh, NC', 'Miami, FL', 'Oakland, CA', 'Minneapolis, MN', 'Tulsa, OK',
    'Cleveland, OH', 'Wichita, KS', 'Arlington, TX', 'New Orleans, LA', 'Bakersfield, CA'
];

const bioTemplates = [
    'Coffee enthusiast ☕ | Tech lover 💻 | Adventure seeker 🌍',
    'Digital nomad 🌐 | Photographer 📸 | Always exploring new places',
    'Foodie 🍕 | Book lover 📚 | Cat parent 🐱',
    'Fitness enthusiast 💪 | Music lover 🎵 | Positive vibes only ✨',
    'Travel addict ✈️ | Sunset chaser 🌅 | Life is beautiful',
    'Creative soul 🎨 | Nature lover 🌿 | Making magic happen',
    'Entrepreneur 🚀 | Dog lover 🐕 | Living my best life',
    'Gamer 🎮 | Pizza connoisseur 🍕 | Spreading good vibes',
    'Yoga instructor 🧘‍♀️ | Plant parent 🌱 | Mindful living',
    'Developer by day 👨‍💻 | Photographer by night 📷 | Always learning',
    null, null, null 
];

const websiteTemplates = [
    'johndoe.dev', 'myportfolio.com', 'creativeworks.net', 'personal-blog.org',
    'photography.studio', 'designstudio.co', 'freelancer.space', 'artworks.gallery',
    null, null, null, null 
];


const randomChoice = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
};

const randomBoolean = (trueProbability: number = 0.5): boolean => {
    return Math.random() < trueProbability;
};

const randomDate = (start: Date, end: Date): string => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0]; 
};

const randomTimestamp = (start: Date, end: Date): string => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString(); 
};

const generatePhoneNumber = (): string => {
    const areaCode = Math.floor(Math.random() * 900) + 100;
    const firstThree = Math.floor(Math.random() * 900) + 100;
    const lastFour = Math.floor(Math.random() * 9000) + 1000;
    return `+1${areaCode}${firstThree}${lastFour}`;
};

const generateUsername = (firstName: string, lastName: string): string => {
    const variations = [
        `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
        `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
        `${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
        `${firstName.toLowerCase()}${Math.floor(Math.random() * 999)}`,
        `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(Math.random() * 99)}`,
    ];
    return randomChoice(variations);
};

const generateEmail = (firstName: string, lastName: string, username: string): string => {
    const domain = randomChoice(domains);
    const emailVariations = [
        `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
        `${username}@${domain}`,
        `${firstName.toLowerCase()}${lastName.toLowerCase()}@${domain}`,
        `${firstName.toLowerCase()}${Math.floor(Math.random() * 999)}@${domain}`,
    ];
    return randomChoice(emailVariations);
};


const generateUniqueId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${Math.random().toString(36).substr(2, 4)}`;
};


export const generateDummyUsers = (count: number = 100): Users => {
    const users: Users = [];
    const usedEmails = new Set<string>();
    const usedUsernames = new Set<string>();
    const usedIds = new Set<string>();
    
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    const eighteenYearsAgo = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());
    const sixtyYearsAgo = new Date(now.getFullYear() - 60, now.getMonth(), now.getDate());

    for (let i = 0; i < count; i++) {
        const firstName = randomChoice(firstNames);
        const lastName = randomChoice(lastNames);
        const fullName = `${firstName} ${lastName}`;
        

        let username = generateUsername(firstName, lastName);
        let usernameAttempts = 0;
        while (usedUsernames.has(username) && usernameAttempts < 10) {
            username = `${generateUsername(firstName, lastName)}${Math.floor(Math.random() * 9999)}`;
            usernameAttempts++;
        }
        usedUsernames.add(username);
        
        let email = generateEmail(firstName, lastName, username);
        let emailAttempts = 0;
        while (usedEmails.has(email) && emailAttempts < 10) {
            email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 9999)}@${randomChoice(domains)}`;
            emailAttempts++;
        }
        usedEmails.add(email);
        
        let id = generateUniqueId();
        while (usedIds.has(id)) {
            id = generateUniqueId();
        }
        usedIds.add(id);
        
        const createdAt = randomTimestamp(oneYearAgo, now);
        const updatedAt = randomTimestamp(new Date(createdAt), now);

        const user: User = {
            id,
            email,
            full_name: fullName,
            bio: Math.random() < 0.7 ? randomChoice(bioTemplates) : null,
            website: Math.random() < 0.3 ? `https://${randomChoice(websiteTemplates)}` : null,
            location: Math.random() < 0.8 ? randomChoice(locations) : null,
            phone: Math.random() < 0.6 ? generatePhoneNumber() : null,
            birth_date: Math.random() < 0.9 ? randomDate(sixtyYearsAgo, eighteenYearsAgo) : null,
            is_verified: Math.random() < 0.8 ? randomBoolean(0.7) : null, // 70% verified
            is_private: Math.random() < 0.9 ? randomBoolean(0.2) : null, // 20% private
            is_active: Math.random() < 0.95 ? randomBoolean(0.95) : null, // 95% active
            created_at: createdAt,
            updated_at: updatedAt,
            username,
            gender: Math.random() < 0.9 ? randomChoice(['M', 'F']) : null,
        };

        users.push(user);
    }

    return users;
};

// Helper function to get a single dummy user
export const generateSingleDummyUser = (): User => {
    return generateDummyUsers(1)[0];
};

// Helper function to get users with specific criteria
export const generateDummyUsersWithCriteria = (criteria: {
    count?: number;
    allVerified?: boolean;
    allActive?: boolean;
    specificGender?: 'M' | 'F';
}): Users => {
    const { count = 100, allVerified, allActive, specificGender } = criteria;
    let users = generateDummyUsers(count);

    if (allVerified) {
        users = users.map(user => ({ ...user, is_verified: true }));
    }

    if (allActive) {
        users = users.map(user => ({ ...user, is_active: true }));
    }

    if (specificGender) {
        users = users.map(user => ({ ...user, gender: specificGender }));
    }

    return users;
};
export const dummyUsers: Users = generateDummyUsers(50);