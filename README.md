# Pet-Advisor

## Development Environment Setup

### Setup a Python Virtual Environment

``` bash
python -m venv env
```

### [pip-tools](https://pypi.org/project/pip-tools/) Installation

``` bash
pip install pip-tools
pip-sync setup/requirements.txt
```

### Setup [Vite](https://vitejs.dev/) Environment

``` bash
cd www
npm install
```

Learn more [here](./www/README.md)

## Running locally

``` bash
docker-compose up -d --build
```

## [Create a super user](https://docs.djangoproject.com/en/4.2/ref/django-admin/#createsuperuser)

``` bash
python app/manage.py createsuperuser
```

## Setup [Django OAuth Toolkit](https://django-oauth-toolkit.readthedocs.io) (DEV ONLY)

- Point your browser to <http://localhost:8000/o/applications/register/>
- Login to super user acccount.
- Fill the form with the following
  - **Name**: Development
  - **Client id**: DEVELOPMENT
  - **Client secret**: SECRET_123
  - **Client type**: Confidential
  - **Authorization grant type**: Resource owner password-based
  - **Redirect uris**: Empty
  - **Algorithm**: No OIDC support
