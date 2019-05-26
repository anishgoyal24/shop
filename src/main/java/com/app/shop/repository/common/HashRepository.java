package com.app.shop.repository.common;

import com.app.shop.entity.HashTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HashRepository extends JpaRepository<HashTable, String> {

    public HashTable findByHash(String hash);
}
