from pathlib import Path

import pytest


def pytest_addoption(parser: pytest.Parser) -> None:
    parser.addoption("--app-root", type=Path, required=True, help="Path to the Oltre checkout")


@pytest.fixture
def app_root(request: pytest.FixtureRequest) -> Path:
    return request.config.option.app_root
