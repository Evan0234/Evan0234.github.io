let blocks = [];
let isLoggedIn = false;

document.addEventListener('DOMContentLoaded', () => {
    showLogin();
});

function showLogin() {
    document.getElementById('login').classList.remove('hidden');
    document.getElementById('builder').classList.add('hidden');
    document.getElementById('approval').classList.add('hidden');
}

function showBuilder() {
    document.getElementById('login').classList.add('hidden');
    document.getElementById('builder').classList.remove('hidden');
    document.getElementById('approval').classList.add('hidden');
}

function showApproval() {
    document.getElementById('login').classList.add('hidden');
    document.getElementById('builder').classList.add('hidden');
    document.getElementById('approval').classList.remove('hidden');
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const request = new XMLHttpRequest();
    request.open('POST', 'https://api.github.com/repos/your-github-username/your-repo/issues'); // Replace with your GitHub username and repository name
    request.setRequestHeader('Authorization', 'token YOUR_GITHUB_TOKEN'); // Replace with your GitHub personal access token
    request.setRequestHeader('Content-Type', 'application/json');
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 201) {
            alert('Login request sent!');
        }
    };
    request.send(JSON.stringify({
        title: 'Admin Login Request',
        body: btoa(JSON.stringify({ username, password })),
        labels: ['login']
    }));
}

function addBlock(type) {
    const id = Date.now();
    const block = { id, type, content: '' };
    blocks.push(block);
    renderBlocks();
}

function updateBlockContent(id, content) {
    const block = blocks.find(b => b.id === id);
    if (block) {
        block.content = content;
    }
}

function renderBlocks() {
    const blocksContainer = document.getElementById('blocks');
    blocksContainer.innerHTML = '';
    blocks.forEach(block => {
        const blockElement = document.createElement('div');
        blockElement.className = 'block';
        switch (block.type) {
            case 'text':
                blockElement.innerHTML = `
                    <textarea onchange="updateBlockContent(${block.id}, this.value)" placeholder="Enter text here">${block.content}</textarea>
                `;
                break;
            case 'image':
                blockElement.innerHTML = `
                    <input type="text" onchange="updateBlockContent(${block.id}, this.value)" placeholder="Enter image URL" value="${block.content}">
                `;
                break;
            case 'video':
                blockElement.innerHTML = `
                    <input type="text" onchange="updateBlockContent(${block.id}, this.value)" placeholder="Enter video URL" value="${block.content}">
                `;
                break;
            default:
                break;
        }
        blocksContainer.appendChild(blockElement);
    });
}

function savePage() {
    const pageName = document.getElementById('pageName').value;
    const pageData = { name: pageName, blocks };
    const request = new XMLHttpRequest();
    request.open('POST', 'https://api.github.com/repos/Evan0234/Evan0234.github.io'); // Replace with your GitHub username and repository name
    request.setRequestHeader('Authorization', 'token YOUR_GITHUB_TOKEN'); // Replace with your GitHub personal access token
    request.setRequestHeader('Content-Type', 'application/json');
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 201) {
            alert('Page saved and submitted for approval!');
        }
    };
    request.send(JSON.stringify({
        title: `New Page: ${pageName}`,
        body: JSON.stringify(pageData),
        labels: ['approve']
    }));
}
