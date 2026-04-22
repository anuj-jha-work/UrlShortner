#include <iostream>
#include <string>
#include <unordered_map>
#include <list>
#include <sstream>

class LRUCache {
public:
    explicit LRUCache(size_t capacity) : capacity_(capacity) {}

    bool get(const std::string& key, std::string& value) {
        auto it = map_.find(key);
        if (it == map_.end()) {
            return false;
        }

        items_.splice(items_.begin(), items_, it->second);
        value = it->second->second;
        return true;
    }

    void set(const std::string& key, const std::string& value) {
        auto it = map_.find(key);
        if (it != map_.end()) {
            it->second->second = value;
            items_.splice(items_.begin(), items_, it->second);
            return;
        }

        if (items_.size() >= capacity_) {
            const std::string lruKey = items_.back().first;
            map_.erase(lruKey);
            items_.pop_back();
        }

        items_.emplace_front(key, value);
        map_[key] = items_.begin();
    }

    void erase(const std::string& key) {
        auto it = map_.find(key);
        if (it == map_.end()) {
            return;
        }

        items_.erase(it->second);
        map_.erase(it);
    }

private:
    size_t capacity_;
    std::list<std::pair<std::string, std::string>> items_;
    std::unordered_map<std::string, std::list<std::pair<std::string, std::string>>::iterator> map_;
};

static bool parseLine(
    const std::string& line,
    std::string& id,
    std::string& op,
    std::string& key,
    std::string& value
) {
    std::stringstream ss(line);

    if (!std::getline(ss, id, '\t')) return false;
    if (!std::getline(ss, op, '\t')) return false;
    if (!std::getline(ss, key, '\t')) return false;

    if (!std::getline(ss, value)) {
        value.clear();
    }

    return true;
}

int main(int argc, char* argv[]) {
    size_t capacity = 500;
    if (argc >= 2) {
        try {
            const int parsed = std::stoi(argv[1]);
            if (parsed > 0) {
                capacity = static_cast<size_t>(parsed);
            }
        } catch (...) {
            // Ignore invalid capacity and keep default.
        }
    }

    LRUCache cache(capacity);
    std::string line;

    while (std::getline(std::cin, line)) {
        std::string id;
        std::string op;
        std::string key;
        std::string value;

        if (!parseLine(line, id, op, key, value)) {
            std::cout << "0\tERR\tbad_request\n";
            std::cout.flush();
            continue;
        }

        if (op == "SET") {
            cache.set(key, value);
            std::cout << id << "\tOK\n";
        } else if (op == "GET") {
            std::string cached;
            if (cache.get(key, cached)) {
                std::cout << id << "\tOK\t" << cached << "\n";
            } else {
                std::cout << id << "\tMISS\n";
            }
        } else if (op == "DEL") {
            cache.erase(key);
            std::cout << id << "\tOK\n";
        } else if (op == "PING") {
            std::cout << id << "\tPONG\n";
        } else {
            std::cout << id << "\tERR\tunknown_op\n";
        }

        std::cout.flush();
    }

    return 0;
}
