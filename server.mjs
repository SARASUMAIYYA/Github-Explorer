import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/user', async (req, res) => {
    const username = req.query.username;

    try {
        // Fetch user details
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) {
            const errorMessage = await userResponse.text();
            throw new Error(`User not found: ${errorMessage}`);
        }

        const userData = await userResponse.json();

        // Fetch user repositories
        const repoResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        const repositories = await repoResponse.json();

        // Combine user details and repositories
        const userProfile = {
            avatar_url: userData.avatar_url,
            name: userData.name || username,
            bio: userData.bio,
            public_repos: userData.public_repos,
            repositories
        };

        res.json(userProfile);
    } catch (error) {
        console.error('Error fetching GitHub user data:', error.message);
        res.status(404).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
