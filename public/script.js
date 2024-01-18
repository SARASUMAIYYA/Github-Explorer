async function getRepositories() {
    const username = document.getElementById('username').value;
    const profileContainer = document.getElementById('profile');
    const profileImage = document.getElementById('profile-image');
    const profileName = document.getElementById('profile-name');
    const repositoriesContainer = document.getElementById('repositories');
    const loader = document.getElementById('loader');

    loader.style.display = 'block';
    profileContainer.style.display = 'none';
    repositoriesContainer.innerHTML = '';

    try {
        // Fetch user details
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();

        // Display user profile
        profileImage.src = userData.avatar_url;
        profileName.textContent = userData.name || username;
        profileContainer.style.display = 'flex';

        // Fetch user repositories
        const repoResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        const repositories = await repoResponse.json();

        // Display repositories
        repositories.forEach(repo => {
            const repoCard = document.createElement('div');
            repoCard.classList.add('repository-card');
            repoCard.innerHTML = `
                <div class="repository-name">${repo.name}</div>
                <div class="repository-description">${repo.description || ''}</div>
            `;
            repositoriesContainer.appendChild(repoCard);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        loader.style.display = 'none';
    }
}
